const bookRide = async (peerid, rideid, seatsbooked, source, destination) => {
    const gas = await contract.methods.BookARide(
        peerid,
        rideid,
        seatsbooked,
        source,
        destination
    ).estimateGas({ from: window.ethereum.selectedAddress });
    
    const result = await contract.methods.BookARide(
        peerid,
        rideid,
        seatsbooked,
        source,
        destination
    ).send({ 
        from: window.ethereum.selectedAddress,
        gas: gas * 1.2 // Add 20% buffer
    });
    return result;
};
