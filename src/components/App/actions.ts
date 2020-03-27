export const TOGGLE_CARD = "TOGGLE_CARD";

export const toggleCard = (number: number) => ({
  type: TOGGLE_CARD,
  number
});

export type Actions = ReturnType<typeof toggleCard>;
