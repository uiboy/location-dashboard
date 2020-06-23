export default interface IFlightService {
  getAverageFlightIndicationsForUser(): Promise<any[]>
}
