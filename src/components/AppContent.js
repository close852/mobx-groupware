import React from 'react'
import {DraftForm,WorkForm} from 'components/form'
function AppContent({appId, formId,history , location, match}) {

    console.log('formId >> ', formId)
    return (
        <div>
            {
              (formId==="DraftForm") &&
              <DraftForm history={history} location={location} match={match} appId={appId} />
            }
                        {
              (formId==="WorkForm") &&
              <WorkForm history={history} location={location} match={match} appId={appId} />
            }

        </div>
    )
}

export default AppContent
