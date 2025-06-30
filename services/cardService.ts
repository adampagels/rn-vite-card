import { Card } from "@/types/card";
import { convertToCamelCase } from "@/utils/helpers/convertToCamelCase";
import { convertToSnakeCase } from "@/utils/helpers/convertToSnakeCase";
import { SupabaseClient } from "@supabase/supabase-js";

export const CardService = (supabase: SupabaseClient) => ({
  async createCard(card: Card): Promise<Card> {
    const { data, error } = await supabase
      .from("cards")
      .insert([card])
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error("No card returned from insert");

    return data;
  },

  async uploadImage(localImagePath: string, userId: string) {
    const response = await fetch(localImagePath);
    const blob = await response.blob();
    const arrayBuffer = await new Response(blob).arrayBuffer();

    const blobId = (blob as ReactNativeBlob)._data?.blobId;
    const fileName = `${userId}/${blobId}.jpg`;

    const { data, error } = await supabase.storage
      .from("card-images")
      .upload(fileName, arrayBuffer, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (error) throw error;
    if (!data) throw new Error("Failed to upload image");

    return data.path;
  },

  async createCardWithImage(
    card: Card,
    localImagePath: string,
    userId: string
  ): Promise<Card> {
    const imageUrl = await this.uploadImage(localImagePath, userId);

    const cardWithImage = {
      ...card,
      userId,
      imageUrl,
    };

    return await this.createCard(convertToSnakeCase(cardWithImage) as Card);
  },

  async fetchCardsByUser(userId: string) {
    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return convertToCamelCase(data) as Card[];
  },
});

interface ReactNativeBlob extends Blob {
  _data: {
    blobId: string;
    name: string;
    size: number;
    type: string;
  };
}
