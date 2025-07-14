import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  onChangePage: (page: number) => Promise<void> | void;
}
export function Pagination({
  pageIndex,
  perPage,
  totalCount,
  onChangePage,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1;
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Total de {totalCount} item(s)
        </span>
        <div className="flex items-center gap-6 lg-gap-8">
          <div className="flex text-sm font-medium">
            Página {pageIndex + 1} de {pages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                onChangePage(0);
              }}
              className="h-8 w-8 p-0"
              variant={"outline"}
              disabled={pageIndex === 0}
            >
              <ChevronsLeft />
              <span className="sr-only">Primeira Página</span>
            </Button>
            <Button
              onClick={() => {
                onChangePage(pageIndex - 1);
              }}
              className="h-8 w-8 p-0"
              variant={"outline"}
              disabled={pageIndex === 0}
            >
              <ChevronLeft />
              <span className="sr-only">Anterior Página</span>
            </Button>
            <Button
              onClick={() => {
                onChangePage(pageIndex + 1);
              }}
              className="h-8 w-8 p-0"
              variant={"outline"}
              disabled={pageIndex >= pages - 1}
            >
              <ChevronRight />
              <span className="sr-only">Próxima Página</span>
            </Button>
            <Button
              onClick={() => {
                onChangePage(pages - 1);
              }}
              className="h-8 w-8 p-0"
              variant={"outline"}
              disabled={pageIndex >= pages - 1}
            >
              <ChevronsRight />
              <span className="sr-only">Última Página</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
