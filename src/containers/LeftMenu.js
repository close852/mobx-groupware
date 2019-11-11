import React from 'react'
//tree-util 이걸로 해결 할 수 있을지도 모름.
import { LeftMenuApp, LeftMenuBbs } from 'containers'
function LeftMenu({ history }) {

    const path = history.location.pathname;
    const app = ['/app',];
    const bbs = ['/bbs', '/article'];
    const isApp = app.filter(p => path.startsWith(p)).length > 0;
    const isBbs = bbs.filter(p => path.startsWith(p)).length > 0;

    return (

        <div>
            {isApp && <LeftMenuApp history={history} />}
            {isBbs && <LeftMenuBbs history={history} />}
        </div>
    )
}

export default LeftMenu
