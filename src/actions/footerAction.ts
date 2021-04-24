const footerActions = {
  toggleShowStatus: (status: boolean) => ({
    type: 'TOGGLE_SHOW',
    status,
  }) as const,
};

export default footerActions;
