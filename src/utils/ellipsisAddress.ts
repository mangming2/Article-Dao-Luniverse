export const ellipsisAddress = (address: string, head = 6, tail = 4) => {
  return address.slice(0, head) + "..." + address.slice(-tail);
};
