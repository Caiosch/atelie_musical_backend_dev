import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import React from "react";

interface RenderProps<T> {
  item: T;
  index: number;
}

interface TableGeneratorProps<T = any> {
  columns: Array<{
    name: string;
    label: () => React.ReactNode;
    render?: (props: RenderProps<T>) => React.ReactNode;
    column?: string;
  }>;
  items: T[];
}

export function TableGenerator<T>({ columns, items }: TableGeneratorProps<T>) {
  return (
    <>
      <TableContainer>
        <Table variant={"default"}>
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              {columns.map((column, columnIndex) => (
                <Th
                  key={`column${columnIndex}`}
                  textTransform={"uppercase"}
                  py={4}
                >
                  {column.label()}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, index) => {
              return (
                <Tr key={`item${index}`} role={"group"}>
                  {columns.map((column, columnIndex) => {
                    const value =
                      column.render?.({ item, index }) ||
                      // @ts-ignore
                      item[column.name] ||
                      // @ts-ignore
                      item[column.column] ||
                      "Não definido";
                    const isUndefined = value === "Não definido";

                    return (
                      <Td
                        key={`column${columnIndex}`}
                        opacity={isUndefined ? 0.5 : 1}
                        fontSize={"md"}
                        fontWeight={"bold"}
                      >
                        {value}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
          {/* <Tfoot>
            <Tr>
              {columns.map((column, columnIndex) => (
                <Th key={`column${columnIndex}`}>{column.label()}</Th>
              ))}
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
    </>
  );
}
