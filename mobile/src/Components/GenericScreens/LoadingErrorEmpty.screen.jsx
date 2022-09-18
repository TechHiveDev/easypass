import LoadingScreen from "./Loading.screen";
import ErrorScreen from "./Error.screen";
import NoRecordsScreen from "./NoRecords.screen";

// =====================================================

export default function LoadingOrErrorScreen({
  isLoading = false,
  isFetching = false,
  error = "",
  data = [],
}) {
  // ---------------------------------

  if (isLoading || isFetching) return <LoadingScreen />;

  // ---------------------------------

  if (error) return <ErrorScreen error={error} />;

  // ---------------------------------

  if (!data.length) return <NoRecordsScreen />;

  // ---------------------------------

  return null;
}

// =====================================================
