interface Item {
  name: string;
  url: string;
}

interface Props {
  name: string;
  description?: string;
  url: string;
  items: Item[];
  /** Optional override; defaults to ItemListOrderAscending. */
  itemListOrder?: "Ascending" | "Descending" | "Unordered";
}

export default function CollectionJsonLd({
  name,
  description,
  url,
  items,
  itemListOrder = "Ascending",
}: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    ...(description ? { description } : {}),
    url,
    inLanguage: "ko",
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: `https://schema.org/ItemListOrder${itemListOrder}`,
      numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: it.url,
        name: it.name,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
