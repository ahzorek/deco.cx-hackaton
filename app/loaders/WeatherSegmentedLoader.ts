import { AppContext } from "apps/vtex/mod.ts";
import type { Product } from "apps/commerce/types.ts";
import weather from "apps/weather/loaders/temperature.ts";

export interface ItemsQuantity {count: number};

export default async function WeatherSegmentedLoader({ count }: ItemsQuantity, req: Request, ctx: AppContext,): Promise<Product[] | null> {
  
  const temp = await weather({ lat: '25.2048', long: '55.2708' })
  
  console.log('REQUEST::', req);
  console.log('AppContext::', ctx);
  
  const clothesLoading = temp.celsius > 24 ? 'camiseta' : 'casaco'

  console.log('LOADER IRA CARREGAR ROUPAS DO TIPO:::', clothesLoading)
    
  const data = ctx.invoke("vtex/loaders/intelligentSearch/productList.ts",
        {props: {count, query: clothesLoading}}
    );
    return data;
}