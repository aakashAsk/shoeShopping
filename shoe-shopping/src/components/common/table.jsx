export default function Table({heading, data}) {
  console.log(data[0])
  return (
    <table>
      <tr>
        {
          Object.keys(data[0]).map((x, y) => {
            if(x === '__v') return;
            if (x === "createdAt") return;
            if (x === "updatedAt") return;
            if (x === "_id") return;
            return <td>{x}</td>;
          })
        }
        <th>Operation</th>
      </tr>
      {data.map((i, j) => {
        return (
          <tr>
            {Object.keys(i).map((x, y) => {
              if (x === "__v") return;
              if (x === "createdAt") return;
              if (x === "updatedAt") return;
              if (x === "_id") return;
              return <td>{i[x]}</td>;
            })}
            <td>Operations</td>
          </tr>
        );
      })}
    </table>
  );
}