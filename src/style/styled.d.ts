import "styled-components";
import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    lightgray: string;
    darkblue: string;
    sand: string;
  }
}
