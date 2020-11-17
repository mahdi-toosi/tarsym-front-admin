const baseQuery = {
    $select: ["_id", "title", "user", "situation", "copiedFrom", "star", "read", "categories", "updatedAt"],
    $limit: 20,
    $skip: 0,
    root: true,
    "$sort[updatedAt]": -1,
};

export default {
    usersDocs: {
        ...baseQuery,
        vitrine: false,
        situation: ["public", "private"],
        read: false,
    },
    adminDocs: {
        ...baseQuery,
        vitrine: true,
    },
};
