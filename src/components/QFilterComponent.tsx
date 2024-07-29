/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useRef, useState } from "react";
import { QFilterBuilder } from "../lib";
import { ERROR_CODES, QFilterOption } from "../types";
import FilterBodyOperations from "../components/FilterBodyOperations";
import { FilterOperator, Join } from "../lib/types";
import { errorMessage } from "../utils/errors";
import { MdFilterListAlt } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import EmptyFilters from "./EmptyFilters";
import HeadButton from "./buttons/HeadButton";
import QFilter from "../lib/QFilter";
import { IoClose } from "react-icons/io5";

export type ColumnsQFilter<T> = {
  [Key in Join<T>]?: QFilterOption;
};

type QFilterProps<T> = {
  columns: ColumnsQFilter<T>;
  onFilter: (QFilter: QFilter<T>, onError?: (error: any) => void) => void;
  onReset?: () => void;
  onClose?: () => void;
  onError: (error: any) => void;
};

/**
 * QFilterComponent
 * @template T - The type of data being filtered.
 * @param {QFilterProps<T>} props - The props for the component.
 * @returns {ReactElement<any>} The filter component.
 */
export const QFilterComponent = <T,>({
  columns,
  onFilter,
  onReset,
  onClose,
  onError,
}: QFilterProps<T>): ReactElement<any> => {
  const [changesNotSave, setChangesNotSave] = useState(false);
  const [_, setReRender] = useState(false);

  const QFilter = useRef<QFilterBuilder<T> | null>(null); // Create a ref to hold the builder instance

  if (!QFilter.current) QFilter.current = new QFilterBuilder<T>(); // Initialize the builder only if it doesn't already exist

  const filtersArr = QFilter.current.getFilters;

  const handleAddCondition = () => {
    QFilter.current?.addConditionUI();
    setReRender((prev) => !prev);
  };

  const handleAddGroup = () => {
    QFilter.current?.group([]);
    setReRender((prev) => !prev);
  };

  const validation = (filters?: any[]): void => {
    filters?.forEach((x, _) => {
      const item: FilterOperator<any> = x as any;

      if (item.type !== "comparisonOperator") return;

      const column = columns[item.field as Join<T>];

      if (!item.children) {
        if (!column) throw Error(errorMessage(ERROR_CODES.EmptyColumn));

        if (!item.operator)
          throw Error(errorMessage(ERROR_CODES.EmptyOperator, column?.label.toString()));

        if (!item.value)
          throw Error(errorMessage(ERROR_CODES.EmptyValue, column?.label.toString()));
      } else {
        if (item.children && item.children.length === 0)
          throw Error(errorMessage(ERROR_CODES.EmptyValue, column?.label.toString()));

        validation(item.children);
      }
    });

    if (changesNotSave) throw Error("Error: Please save all the filters.");
  };

  const handleFilter = () => {
    try {
      validation(filtersArr);
      onFilter(QFilter.current!.build(), onError);
    } catch (err: any) {
      onError?.(err.message ?? "One or more conditions are empty or invalid.");
    }
  };

  const handleReset = () => {
    const deleteCount = QFilter.current?.getFilters.length;
    QFilter.current?.getFilters.splice(0, deleteCount);
    QFilter.current!.build();
    setReRender((prev) => !prev);
    onReset?.();
  };

  return (
    <div className="q-filter-container">
      <div className="q-filter-container-header">
        <div style={{ display: "flex", gap: 10 }}>
          <HeadButton title="Filter" Icon={MdFilterListAlt} onClick={handleAddCondition} />
          <HeadButton title="Group" Icon={FaLayerGroup} onClick={handleAddGroup} />
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="q-filter-group-close"
            style={{ padding: "0 0.55rem" }}
          >
            <IoClose className="q-filter-close-icon" />
          </button>
        )}
      </div>
      <div className="q-filter-operations-container">
        {filtersArr?.length > 0 ? (
          <FilterBodyOperations
            changesSave={setChangesNotSave}
            filters={filtersArr}
            setReRender={setReRender}
            columns={columns}
          />
        ) : (
          <EmptyFilters />
        )}
      </div>

      <div className="q-filter-footer_container">
        <div className="q-filter-footer_content">
          <FooterButton title="Reset" onClick={handleReset} />
          <FooterButton title="Apply" onClick={handleFilter} />
        </div>
      </div>
    </div>
  );
};

const FooterButton = ({
  title,
  ...rest
}: { title: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="button-simple" style={{ width: "5rem" }} {...rest}>
      {title}
    </button>
  );
};
