import { Table } from "@mantine/core";

const RolesAndInvitesTable = ({ children }) => {
  return <Table verticalSpacing="xs">
    <thead>
    <tr>
      <th style={{ flex: 1 }}>user</th>
      <th style={{ width: 240, textAlign: "center" }}>Role</th>
      <th style={{ width: 150, textAlign: "center" }}>Invitation status</th>
      <th style={{ width: 80 }}></th>
    </tr>
    </thead>
    <tbody>
    {children}
    </tbody>
  </Table>;
};
export default RolesAndInvitesTable;
