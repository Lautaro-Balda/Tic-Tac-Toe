import Square from "./Square";

const Board = ({ board, updateBoard }) => {
   return (
      <section className="game">
         {
            board.map((square, index) => {
               return (
                  <Square
                     key={index}
                     index={index}
                     updateBoard={updateBoard}
                  >
                     {square}
                  </Square>
               );
            })
         }
      </section>
   )
}

export default Board