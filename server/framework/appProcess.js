import appDAO from '../models/appDAO'
import appLineDAO from '../models/appLineDAO'
import opinionDAO from '../models/opinionDAO'

import { uuid } from '../utils/uuidUtils'

//appVO = { appId, title, content, appLine, docno, user_id, dept_id, makedate }
/*
    기안시 처리방법
    1. APP 테이블에 데이터 삽입
    2. APP_LINE 테이블에 데이터 삽입
    3. curLineUser정보 가져와서  appProcess 실행
        -> appProcess에서 APP, APP_LINE, OPINION 정보 변경
*/
const draftProcess = async (appVO) => {
    console.log('draftProcess > ')

    // 기안시 필요한 처리

    //0. appId 존재시, 진행 여부 및 상신취소 여부 확인

    //1. APP 테이블에 마스터 정보 insert
    await appDAO.insertApp(appVO);
    //2. AppLine(appid 필요) 테이블에 Line 정보 insert
    const arrLines = appVO.appLine;
    console.log('appVO.jsonLine >>', appVO.appLine)
    const appLines = arrLines.map(line => ({
        line_id: uuid(),
        app_id: appVO.appId,
        auth_type: line.auth_type,
        auth_id: line.userid,
        taskno: line.taskno,
        sortno: line.sortno,
        action_type: line.action_type,
        status: line.status,
    }));
    //  sql: 'INSERT INTO APP_LINE (line_id, app_id,auth_type,auth_id, taskno, sortno, action_type, app_status)  VALUES (NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)' }
    appLines.forEach(appLine => {
        console.log('appLine..', appLine)
        appLineDAO.insertAppLine(appLine)
    });


    //4. todolist, inglist (appline 정보기준으로)미결 진행정보 insert

    //5. 파일 처리 필요

    appProcess({ appVO, appLines });
}

const appProcess = ({ appVO, appLines }) => {

    const curLineUser = appLines.filter(line => line.taskno === appVO.cur_taskno && line.sortno === appVO.cur_sortno)[0];
    console.log('appVO.opinion,line_id', appVO.opinion, curLineUser)

    console.log('appProcess > ')
    //결재시 필요한 처리

    //0. 결재 이미 처리됬는지 확인

    //1. App 테이블에 마스터 정보 update
    appDAO.updateAppStatusByAppId(appVO);

    //2. AppLine 테이블에 Line정보 update
    appLineDAO.updateAppLineStatusByLineId(curLineUser);

    //3. AppOpinion 테이블에 의견정보 insert
    if (appVO.opinion) {
        const opinion = {
            opinion_id: uuid(),
            user_id: appVO.user_id,
            app_id: appVO.appId,
            line_id: curLineUser.line_id,
            opinion: appVO.opinion,
        }
        console.log('curLineUser : ', opinion, '\n', curLineUser)
        opinionDAO.insertOpinion(opinion);
    }

    //-- 파일 처리 없을듯

    //6. 후처리 존재시, 후처리

}
//협조 프로세스가 필요할지 모르겠긴함.
const coopProcess = () => {

    console.log('appProcess > ')
    //결재시 필요한 처리

    //0. 결재 이미 처리됬는지 확인

    //1. App 테이블에 마스터 정보 update

    //2. AppLine 테이블에 Line정보 update

    //3. AppOption 테이블에 의견정보 update

    //4. todolist, inglist 진행, 미결정보 변경

    //-- 파일 처리 없을듯

    //6. 후처리 존재시, 후처리

}


// 반려 프로세스
const cancelProcess = () => {
    console.log('cancelProcess > ')
    //반려시 필요한 처리

    //1. App 테이블에 마스터 정보 update

    //2. AppLine 테이블에 Line정보 update

    //3. AppOption 테이블에 의견정보 update

    //4. todolist, inglist 진행, 미결정보 변경

}

//완료 처리만 하는 프로세스
const endProcess = ({ appVO, appLines }) => {
    console.log('endProcess > ')
    const curLineUser = appLines.filter(line => line.taskno === appVO.cur_taskno && line.sortno === appVO.cur_sortno)[0];

    //결재완료시 필요한 처리
    //문서번호 채번
    //1. App 테이블에 마스터 정보 update
    appDAO.updateAppStatusByAppId(appVO);

    //2. AppLine 테이블에 Line정보 update
    appLineDAO.updateAppLineStatusByLineId(curLineUser);

    //3. AppOpinion 테이블에 의견정보 insert
    if (appVO.opinion) {
        const opinion = {
            opinion_id: uuid(),
            user_id: appVO.user_id,
            app_id: appVO.appId,
            line_id: curLineUser.line_id,
            opinion: appVO.opinion,
        }
        console.log('curLineUser : ', opinion, '\n', curLineUser)
        opinionDAO.insertOpinion(opinion);
    }
    //3. todoList, ingList delete 하고, endList insert

    //4. 수신처 처리

    //5. 결재완료 후 처리
}

export default ({
    draftProcess,
    appProcess,
    coopProcess,
    cancelProcess,
    endProcess,
});