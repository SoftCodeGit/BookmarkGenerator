//TO-DO: use the actual domain name
var domain = "bookmark-qa";
export let CONFIG = {
    baseUrls: {
        bookmarkOptions: `http://${domain}/api/bookmark/BookmarkOptions/`,
        bookmark: `http://${domain}/api/Bookmark/`
    },
    useMock: false
}