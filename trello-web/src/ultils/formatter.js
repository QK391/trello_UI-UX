import Board from "~/pages/Boards/_id"

export const capiatllizeFirstletter = (val) => {
    if (!val) return ''
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}
export const generatePlacehoderCard = (column) => {
    return {
        _id: `${column._id}-placehoder-card`,
        boardId: column.boardId,
        column: column._id,
        FE_PlacehoderCard: true,
    }
}