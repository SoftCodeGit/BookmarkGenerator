// TODO - should return different config based on environment
var port = 51989;   
export let CONFIG = {
    baseUrls: {
        bookmarkOptions: `http://localhost:${port}/api/bookmark/BookmarkOptions/`,
        bookmark: `http://localhost:${port}/api/Bookmark/`
    },
    useMock: false
}