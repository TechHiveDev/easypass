import { FlashList } from "@shopify/flash-list";
import { Discover } from "./Facility";
import { Container } from "./FacilityScreenContainer";
import { useListContext } from "../../../Navigators/FacilityContext";

export default function FacilityScreen() {
  const { data, error, isLoading } = useListContext();
  if (error || isLoading) return null;
  return (
    <Container>
      <FlashList
        data={data}
        renderItem={({ item }) => <Discover {...item} />}
        keyExtractor={(item) => item.name}
        estimatedItemSize={50}
        numColumns={2}
      />
    </Container>
  );
}
