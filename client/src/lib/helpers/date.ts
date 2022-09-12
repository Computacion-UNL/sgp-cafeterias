import { format, formatDistance } from "date-fns";
import { es } from "date-fns/locale";

export const dateDistance = (date: string, baseDate?: string) =>
  formatDistance(new Date(date), baseDate ? new Date(baseDate) : new Date(), {
    addSuffix: true,
    locale: es,
  });

export const dateFormat = (
  date: string,
  formatDate: string | undefined = "PPPp"
) => format(new Date(date), formatDate, { locale: es });
