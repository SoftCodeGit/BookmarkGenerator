import {BookmarkContext} from './bookmark-context';
import {Bookmark} from './bookmark';

export var CONTEXTS: BookmarkContext[] = [
    { "ReportContextCode": "ACTION", "ReportContextDesc": "Action" },
    { "ReportContextCode": "ACTIONENTITY", "ReportContextDesc": "Party" },
    { "ReportContextCode": "ACTIONSERVICE", "ReportContextDesc": "Service" },
    { "ReportContextCode": "RECEIPT", "ReportContextDesc": "Receipt" }
];


export var BOOKMARKS: Bookmark[] = [
    {
        "BookmarkCode": "DefendantTitle", "ReportContextCode": "CASE", "BookmarkDesc": "Defendant Title from the Case", "HasBookmarkOptions": false
    },
    { "BookmarkCode": "ActionFeeAmount", "ReportContextCode": "ACTON", "BookmarkDesc": "ActionFeeAmount for the Action", "HasBookmarkOptions": true},
    { "BookmarkCode": "ActionStatus", "ReportContextCode": "ACTION", "BookmarkDesc": "Description of Action Status", "HasBookmarkOptions": false },
    { "BookmarkCode": "CasePayoff", "ReportContextCode": "CASE", "BookmarkDesc": "CasePayoff for the case", "HasBookmarkOptions": true},
    { "BookmarkCode": "ActionType", "ReportContextCode": "ACTION", "BookmarkDesc": "Description of ActionType", "HasBookmarkOptions": false },
    { "BookmarkCode": "CourtName", "ReportContextCode": "ACTION", "BookmarkDesc": "Issuing Court Name", "HasBookmarkOptions": false }
];