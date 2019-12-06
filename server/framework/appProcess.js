import appDAO from '../models/appDAO'
import appLineDAO from '../models/appLineDAO'
import opinionDAO from '../models/opinionDAO'

import { uuid } from '../utils/uuidUtils'
import { now } from '../utils/dateUtils'


//moment().format('YYYY/MM/DD HH:mm:ss')
const makeAppInit = async ({ appVO, appLines }) => {
    console.log('draftProcess > ')

    // 기안시 필요한 처리

    //0. appId 존재시, 진행 여부 및 상신취소 여부 확인

    //1. APP 테이블에 마스터 정보 insert
    await appDAO.insertApp(appVO);
    //2. AppLine(appid 필요) 테이블에 Line 정보 insert
    console.log('appVO.jsonLine >>', appLines)
    const lineData = appLines.map(line => ([
        line.line_id,
        appVO.appId,
        line.auth_type,
        line.auth_id,
        line.taskno,
        line.sortno,
        line.action_type,
        line.status,
    ]));

    console.log('lineData >>>', lineData);
    await appLineDAO.insertAppLineBatch(lineData)

    // return appVO;
}

const makeAppLine = (appVO) => {
    const arrLines = appVO.appLine;
    console.log('appVO.jsonLine >>', appVO.appLine)
    return arrLines.map(line => ({
        line_id: uuid(),
        app_id: appVO.appId,
        auth_type: line.auth_type,
        auth_id: line.userid,
        taskno: line.taskno,
        sortno: line.sortno,
        action_type: line.action_type,
        status: line.status,
    }));
}
const makeAppData = () => {

}

//appVO = { appId, title, content, appLine, docno, user_id, dept_id, makedate }
/*
    기안시 처리방법
    1. APP 테이블에 데이터 삽입
    2. APP_LINE 테이블에 데이터 삽입
    3. curLineUser정보 가져와서  appProcess 실행
        -> appProcess에서 APP, APP_LINE, OPINION 정보 변경
*/
const draftProcess = async (appVO) => {
    const appLines = makeAppLine(appVO);
    await makeAppInit({ appVO, appLines });
    console.log('draftProcess > ')
    // await appProcess({ appVO, appLines });

    //3. AppOpinion 테이블에 의견정보 insert
    if (appVO.opinion) {
        const opinion = {
            opinion_id: uuid(),
            user_id: appVO.user_id,
            app_id: appVO.appId,
            line_id: appLines[0].line_id,
            opinion: appVO.opinion,
        }
        console.log('curLineUser : ', opinion)
        await opinionDAO.insertOpinion(opinion);
    }

    const isLastSign = await signProcess(appVO.appId);

    console.log('isLastSign >>> ', isLastSign)
    if (isLastSign) {
        endProcess(appVO.appId);
    }

    afterProcess();
}
const afterProcess = () => {

}

const signProcess = async (appId) => {
    // const appData = await appDAO.findAppById(appId)[0];
    // const appLineData = await appLineDAO.findAppLineByLineId(lineId)[0];

    console.log('signProcess >> ')
    // ({ appId, appStatus, lineStatus, appdate }
    const updateData = {
        appId,
        appStatus: 'APP',
        lineStatus: 'SIGN',
        appdate: now()
    }
    console.log('signProcess : updateData > ', updateData)
    return await updateAppStatus(updateData);

}

const appProcess = async ({ app_id, user_id, line_id, opinion }) => {

    console.log('appProcess >>>> ')
    const isLastSign = await signProcess(app_id);

    //3. AppOpinion 테이블에 의견정보 insert
    if (opinion) {
        const opinionData = {
            opinion_id: uuid(),
            user_id: user_id,
            app_id: app_id,
            line_id: line_id,
            opinion: opinion,
        }
        console.log('curLineUser : ', opinionData)
        await opinionDAO.insertOpinion(opinionData);
    }

    console.log('isLastSign appProcess >>> ', isLastSign)
    if (isLastSign) {
        endProcess(app_id);
    }


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
const cancelProcess = async (appId) => {
    console.log('cancelProcess > ')
    //반려시 필요한 처리

    // ({ appId, appStatus, lineStatus, appdate }
    const updateData = {
        appId,
        appStatus: 'CANCEL',
        lineStatus: 'CANCEL',
        appdate: now()
    }
    console.log('signProcess : updateData > ', updateData)
    return await updateAppStatus(updateData);
    //1. App 테이블에 마스터 정보 update

    //2. AppLine 테이블에 Line정보 update

    //3. AppOption 테이블에 의견정보 update

    //4. todolist, inglist 진행, 미결정보 변경

}

//완료 처리만 하는 프로세스
const endProcess = async (appId) => {

    console.log('endProcess >> ')

    //App update
    //AppLine Update
    //문서대장에 넣기, 수신처에 보내기

    //5. 결재완료 후 처리
    afterProcess();
}


const updateAppStatus = async ({ appId, appStatus, lineStatus, appdate }) => {
    const curLineUser = await appLineDAO.findCurLineData(appId);

    console.log('curLineUser??? appdate', curLineUser, appdate)
    //TODO 병렬합의 처리 별도 필요......
    const nextLineData = await appLineDAO.findNextLineData(curLineUser[0].line_id);

    const isLastSign = !(nextLineData && nextLineData.length);
    console.log('curLineUser >>>', curLineUser[0])
    console.log('nextLineData >>>', nextLineData)
    //status, cur_taskno, cur_sortno, app_id

    let taskno = 1;
    let sortno = 1;
    if (!isLastSign) {
        taskno = nextLineData[0].taskno;
        sortno = nextLineData[0].sortno;
    }
    const updateData = {
        status: appStatus,
        cur_taskno: taskno,
        cur_sortno: sortno,
        app_id: appId,
        appdate: appdate,
    }
    console.log('>>>>> updateData :: ', updateData)

    //1. App 테이블에 마스터 정보 update
    await appDAO.updateAppStatusByAppId(updateData);

    //status, cur_taskno, cur_sortno, app_id
    const updateLineData = {
        status: lineStatus,
        line_id: curLineUser[0].line_id,
        appdate: appdate,
    }
    console.log('>>>>> updateLineData :: ', updateLineData)
    //2. AppLine 테이블에 Line정보 update
    await appLineDAO.updateAppLineStatusByLineId(updateLineData);

    return isLastSign;
}

export default ({
    draftProcess,
    appProcess,
    coopProcess,
    signProcess,
    cancelProcess,
    endProcess,
});