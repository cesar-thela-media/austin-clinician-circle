import { hasRobollyConfig } from "@/lib/env";
import { EventsClient } from "./EventsClient";

export default function EventsPage() {
  return <EventsClient hasCertificates={hasRobollyConfig} />;
}
