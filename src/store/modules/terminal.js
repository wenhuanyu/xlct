export default {
    state: {
        terminalInfo: '',
        examList: '',
        nowExam: 0,
        practiceType:-1
    },
    getters: {},
    mutations: {
        setExamInfo(state, info) {
            state.terminalInfo = info.patient;
            state.examList = info.exam;
        },
        nextExam(state) {
            state.nowExam++;
            state.nowExam = state.nowExam > state.examList.length ? state.examList.length : state.nowExam;
        },
        setPracticeType(state,flag){
            state.practiceType = flag
        }
    },
    actions: {}
}
