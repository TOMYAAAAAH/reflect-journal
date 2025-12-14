
const DEFAULT_PLAYLIST_ID = 1;

export default function getValidatedPlaylistId(rawPlaylistId: string | undefined): number {

    if (rawPlaylistId) {
        const parsedId = Number(rawPlaylistId);

        if (Number.isInteger(parsedId) && parsedId > 0) {
            return parsedId;
        }

        return -1;
    }
    return DEFAULT_PLAYLIST_ID;
}