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
        situation: ["publish", "private"],
        read: false,
    },
    adminDocs: {
        ...baseQuery,
        vitrine: true,
    },
    adminDocs_star: {
        ...baseQuery,
        vitrine: true,
        star: true,
    },
    usersDocs_star: {
        ...baseQuery,
        vitrine: false,
        situation: ["publish", "private"],
        star: true,
    },
    usersDocs_read: {
        ...baseQuery,
        vitrine: false,
        situation: ["publish", "private"],
        read: true,
    },
};
