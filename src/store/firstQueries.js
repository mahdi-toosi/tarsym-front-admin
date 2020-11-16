const baseQuery = {
    $select: ["_id", "title", "user", "situation", "copiedFrom", "star", "read", "categories", "updatedAt"],
    $limit: 20,
    $skip: 0,
    root: true,
};

export default {
    usersDocs: {
        params: {
            ...baseQuery,
            vitrine: false,
            situation: ["public", "private"],
            read: false,
            "$sort[updatedAt]": -1,
        },
    },
    adminDocs: {
        params: {
            ...baseQuery,
            vitrine: true,
            "$sort[updatedAt]": -1,
        },
    },
};
