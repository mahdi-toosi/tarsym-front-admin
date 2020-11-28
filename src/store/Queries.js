const baseQueryForDocs = {
    $select: ["_id", "title", "user", "situation", "copiedFrom", "star", "read", "categories", "updatedAt"],
    $limit: 20,
    $skip: 0,
    root: true,
    "$sort[updatedAt]": -1,
};

export default {
    baseQueryForDocs,
    usersDocs: {
        ...baseQueryForDocs,
        vitrine: false,
        situation: ["publish", "private"],
        read: false,
    },
    adminDocs: {
        ...baseQueryForDocs,
        vitrine: true,
    },
    adminDocs_star: {
        ...baseQueryForDocs,
        vitrine: true,
        star: true,
    },
    usersDocs_star: {
        ...baseQueryForDocs,
        vitrine: false,
        situation: ["publish", "private"],
        star: true,
    },
    usersDocs_read: {
        ...baseQueryForDocs,
        vitrine: false,
        situation: ["publish", "private"],
        read: true,
    },
    allUsers: { $limit: 40, "$sort[updatedAt]": -1 },
    drawerRequest: {
        $limit: 40,
        "$sort[nationalCode]": -1,
        role: 3,
    },
};
