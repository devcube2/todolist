
function getBoardList(){
    let boardList = localStorage.getItem('boardList');
    if( boardList == null ){
        boardList = [];
    }else {
        boardList = JSON.parse( boardList );
    }
    return boardList;
} // f end

function setBoardList( boardList ){
    localStorage.setItem(
        'boardList' , JSON.stringify( boardList ) );
}