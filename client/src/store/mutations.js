export default {
    loading(state,payload){
        state.loading = payload.flag;
    },
    resultArea(state,payload){
        state.resultArea = payload.resultArea;
    }
}