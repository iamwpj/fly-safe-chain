import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("PoliciesModule", (m) => {
    // const passenger_address = m.getParameter("passenger_address", );
    const passenger_name = m.getParameter("passenger_name","Jane Doe");
    const flight_number = m.getParameter("flight_number",'XX000');
    const flight_date = m.getParameter("flight_date",'01012024T010100');
    const departure_city = m.getParameter("departure_city",'DFW');
    const destination_city = m.getParameter("destination_city",'DFW');
    const policy_status = m.getParameter("policy_status",0);

    const Policies = m.contract("Policies", []);

    m.call(Policies, "loadPolicy", [m.getAccount(1),passenger_name,flight_number,flight_date,departure_city,destination_city,policy_status])
  
    return { Policies };
});
