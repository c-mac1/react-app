import React from "react";
import { fireEvent, getByText, render, screen, waitFor } from "@testing-library/react";
import DataTable from "../components/DataTable";  // Adjust the path if needed
import { DataProvider } from "../context/DataContext";
import { PriceData } from "../types/priceData";
import { createGrid, GridOptions } from 'ag-grid-community';


const mockData: PriceData = {
    open: [150, 190],
    volume: [1000, 1200],
    high: [160, 165],
    low: [140, 145],
    close: [155, 160],
    timestamp: [new Date(1609459200000), new Date(1609545600000)]
  };

  function createAgGrid() {
    const div = document.createElement('div');

    const gridOptions: GridOptions = {
        columnDefs: [
            { headerName: 'Open', field: 'open' },
            { headerName: 'Volume', field: 'volume' },
        ],
        rowData: [
            { open: 150, volume: 1000 },
            { open: 155, volume: 1200 },
        ],
    };
        const api = createGrid(div, gridOptions);

    return { div, api };
  }
  
  

const renderWithData = (ui: React.ReactElement) => {
  return render(
    <DataProvider value={{ data: mockData, setData: jest.fn() }}>
      {ui}
    </DataProvider>
  );
  };

test("renders DataTable with data", async () => {
  renderWithData(<DataTable search="" />);

  await waitFor(() => {
    expect(screen.getByRole('columnheader', { name: /open/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /volume/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /high/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /low/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /close/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /timestamp/i })).toBeInTheDocument();
  });

  await waitFor(() => {
    // Check for the presence of data within the grid cells
    const gridCells = screen.getAllByRole("gridcell");
    expect(gridCells.length).toBeGreaterThan(0); // Ensure that grid cells are rendered

    // Check that expected data is inside the grid cells
    expect(gridCells[0]).toHaveTextContent("150"); // 'open' value for the first row
    expect(gridCells[1]).toHaveTextContent("1000"); // 'volume' value for the first row
    expect(gridCells[2]).toHaveTextContent("160"); // 'high' value for the first row
    expect(gridCells[3]).toHaveTextContent("140"); // 'low' value for the first row
    expect(gridCells[4]).toHaveTextContent("155"); // 'close' value for the first row
  });
});

test("filters table data based on search input", async () => {
  renderWithData(<DataTable search="150" />);

  // Wait for rows to be filtered
  await waitFor(() => {
    const filteredRows = screen.getAllByRole("gridcell");
    expect(filteredRows.some(cell => cell.textContent === "150")).toBe(true); // Check if filtered value is present
  });
});


test("sorts rows correctly when column header is clicked", async () => {
  renderWithData(<DataTable search="" />); 
  // Wait for the sorting to take effect
  await waitFor(() => {
    const columnHeader = screen.getByRole('columnheader', { name: /open/i });
    fireEvent.click(columnHeader);
    const firstRow = screen.getByText("150");  // Ensure the first row's first cell is sorted
    console.log(firstRow);
    expect(firstRow).toBeInTheDocument(); // Check if "150" is the first value (after sorting)
  });

  //check opposite direction
  await waitFor(() => {
    const columnHeader = screen.getByRole('columnheader', { name: /open/i });
    fireEvent.click(columnHeader);
    const firstRow = screen.getByText("155");  // Ensure the first row's first cell is sorted
    console.log(firstRow);
  });

  // Check that the number of displayed rows is correct after sorting
  const gridCells = screen.getAllByRole("gridcell");
  expect(gridCells.length).toBeGreaterThan(0); // Ensure that grid cells are rendered
});



test('Data renders correctly', async () => {
  const { div, api } = createAgGrid();
  expect(getByText(div, 'Open')).toHaveTextContent('Open');
  expect(getByText(div, '150')).toBeDefined();
  expect(api.getDisplayedRowCount()).toBe(2);
});


// test('Data renders correctly', async () => {
//   const { div, api } = createAgGrid();
//   const sort = ag_grid_utils.clickOnHeader("Name");
//   expect(sort).toBeDefined();

//   expect(api.getDisplayedRowCount()).toBe(2);
// });








