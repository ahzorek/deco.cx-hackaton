import { AppContext } from "apps/vtex/mod.ts";
import type { Product } from "apps/commerce/types.ts";
import weather from "apps/weather/loaders/temperature.ts";

export interface ItemsQuantity {
  count: number;
}

export default async function WeatherSegmentedLoader(
  { count }: ItemsQuantity,
  req: Request,
  ctx: AppContext,
): Promise<Product[] | null> {
  const ipResponse = await fetch("https://api.ipgeolocation.io/getip");
  const { ip } = await ipResponse.json();

  //  Use o endereço IP do usuário para obter a localização
  const response = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=cabd772e8c8d44148c531c2037fdf960&ip=${ip}`,
  );
  const locationData = await response.json();
  const { latitude, longitude } = locationData;

  const temp = await weather({ lat: latitude, long: longitude });

  console.log("LATITUDE:::", latitude, "LONGITUDE:::", longitude);
  console.log("TEMPERATURA :::", temp);

  const clothesLoading = temp.celsius > 24 ? "camiseta" : "casaco" || "jaqueta";

  console.log("LOADER IRA CARREGAR ROUPAS DO TIPO:::", clothesLoading);

  const data = ctx.invoke("vtex/loaders/intelligentSearch/productList.ts", {
    props: { count, query: clothesLoading },
  });
  return data;
}
