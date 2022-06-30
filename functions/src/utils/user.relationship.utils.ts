export const checkCurrentRelationship = (newChildUid: string, childs?: string[]) => {
  if (!childs) {
    return [newChildUid];
  }
  if (childs.includes(newChildUid)) {
    return childs;
  }
  return childs.concat(newChildUid);
};
