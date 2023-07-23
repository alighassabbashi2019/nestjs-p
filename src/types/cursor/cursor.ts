import { CursorData } from './cursor-data.type';

export class Cursor {
  public static toString(data: CursorData): string {
    const stringed = Cursor.serialize(data);
    return stringed;
  }

  public static toData(stringData: string): null | CursorData {
    try {
      const data = JSON.parse(Cursor.deserialize(stringData));
      return data;
    } catch (error) {
      return error;
    }
  }

  protected static serialize(data: CursorData): string {
    return Buffer.from(JSON.stringify(data)).toString('base64');
  }

  protected static deserialize(stringData: string): string {
    return Buffer.from(stringData, 'base64').toString('utf-8');
  }
}
