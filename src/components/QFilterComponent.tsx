/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useRef, useState } from "react";
import { QFilterBuilder } from "../lib";
import { ERROR_CODES, QFilterProps } from "../types";
import FilterBodyOperations from "../components/FilterBodyOperations";
import { FilterOperator, Join } from "../lib/types";
import { errorMessage } from "../utils/errors";
import { MdFilterListAlt } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import EmptyFilters from "./EmptyFilters";
import HeadButton from "./buttons/HeadButton";
import { IoClose } from "react-icons/io5";

/**
 * QFilterComponent
 * @template T - The type of data being filtered.
 * @param {QFilterProps<T>} props - The props for the component.
 * @returns {ReactElement<any>} The filter component.
 */
export const QFilterComponent = <T,>(props: QFilterProps<T>): ReactElement<any> => {
  const { columns, onFilter, onReset, onClose, onError, lang } = props;

  const [_, setReRender] = useState(false);

  const QFilter = useRef<QFilterBuilder<T> | null>(null);

  // Initialize the builder only if it doesn't already exist
  if (!QFilter.current) QFilter.current = new QFilterBuilder<T>();

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
      if (x.type === "logicalOperator") return;

      const item: FilterOperator<any> = x as any;

      const column = columns[item.field as Join<T>];

      if (!item.children || item.children.length < 1) {
        if (item.children && item.children?.length < 1) {
          throw Error(errorMessage(ERROR_CODES.GroupEmpty));
        }

        if (!column) {
          throw Error(errorMessage(ERROR_CODES.EmptyColumn));
        }
        if (!item.operator) {
          throw Error(errorMessage(ERROR_CODES.EmptyOperator, column?.label.toString()));
        }
      } else {
        validation(item.children);
      }
    });
  };

  const handleFilter = () => {
    try {
      validation(filtersArr);
      onFilter(QFilter.current!.build());
    } catch (err: any) {
      onError(err.message ?? "One or more conditions are empty or invalid.");
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
          <HeadButton
            title={lang?.headerButtons?.["Filter"] ?? "Filter"}
            Icon={MdFilterListAlt}
            onClick={handleAddCondition}
          />
          <HeadButton
            title={lang?.headerButtons?.["Group"] ?? "Group"}
            Icon={FaLayerGroup}
            onClick={handleAddGroup}
          />
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
            logicalOperators={lang?.logicalOperators}
            columnsConfig={lang?.columns}
            filters={filtersArr}
            setReRender={setReRender}
            columns={columns}
            headerButtons={lang?.headerButtons}
            operators={lang?.operators}
          />
        ) : (
          <EmptyFilters />
        )}
      </div>

      <div className="q-filter-footer_container">
        <div className="q-filter-footer_content">
          <FooterButton title={lang?.FooterButtons?.["Reset"] ?? "Reset"} onClick={handleReset} />
          <FooterButton title={lang?.FooterButtons?.["Apply"] ?? "Apply"} onClick={handleFilter} />
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
    <button className="button-simple" style={{ minWidth: "5rem" }} {...rest}>
      {title}
    </button>
  );
};
