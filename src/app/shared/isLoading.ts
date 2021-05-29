export function isLoading(status: boolean) {
  document.dispatchEvent(
    new CustomEvent("loading", {
      detail: {
        isLoading: status,
      },
    })
  );
}
