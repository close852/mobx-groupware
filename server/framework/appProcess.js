const draftProcess = () => {
    console.log('draftProcess > ')

    // 기안시 필요한 처리

    //0. appId 존재시, 진행 여부 및 상신취소 여부 확인

    //1. APP 테이블에 마스터 정보 insert

    //2. AppLine(appid 필요) 테이블에 Line 정보 insert

    //3. AppOpinion 테이블에 의견정보 insert

    //4. todolist, inglist (appline 정보기준으로)미결 진행정보 insert

    //5. 파일 처리 필요

    //6. 후처리 존재시, 후처리
}

const appProcess = () => {

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
const endProcess = () => {
    console.log('endProcess > ')

    //결재완료시 필요한 처리

    //1. App 테이블에 마스터 정보 update

    //2. AppLine 테이블에 Line정보 update

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