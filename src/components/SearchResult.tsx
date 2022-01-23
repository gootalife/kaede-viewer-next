import { Table } from 'react-bootstrap'

export const SearchResult = ({ columns, data }: { columns: string[]; data: JSX.Element[][] }) => {
  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={`column_${index}`}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={`row_${index}`}>
              {row.map((elem, idx) => (
                <td key={`elem_${idx}`}>{elem}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
