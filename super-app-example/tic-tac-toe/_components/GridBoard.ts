import { Component, m } from "@ckzero/maya/web";
import type { Move, Player } from "../types";

type GridBoardProps = {
  playerXsTurn: boolean;
  moves: Move[];
  onMove: (index: number) => void;
  winner: Player | null;
  winCombo: number[] | null;
};

export const GridBoard = Component<GridBoardProps>(
  ({ playerXsTurn, moves, onMove, winner, winCombo }) => {
    const blocks = Array.from(Array(9).keys());

    const getTextColor = (player: Player) =>
      player === "X" ? "green" : "pink";
    const getBgColor = (player: Player) =>
      player === "X" ? "bg-washed-green" : "bg-washed-pink";
    const getColorsCss = (player: Player) =>
      `${getTextColor(player)} ${getBgColor(player)}`;

    return m.Div({
      class: () =>
        `grid3x3 br4 pa4 ${
          !winner.value
            ? playerXsTurn.value
              ? "bg-light-green"
              : "bg-light-pink"
            : "bg-moon-gray banned"
        }`,
      children: [
        ...blocks.map((_, index) =>
          m.Div({
            class: () =>
              `flex items-center mid-gray justify-center tc br3 ba b--gray bg-white f1 b h5 ${
                winner.value ? "banned" : "pointer"
              } ${
                winCombo.value?.includes(index)
                  ? getColorsCss(winner.value as Player)
                  : ""
              }`,
            onclick: () => onMove(index),
            innerText: () =>
              moves.value.find((move) => move.index === index)?.player || "•",
          })
        ),
      ],
    });
  }
);
