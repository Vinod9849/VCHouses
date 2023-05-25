namespace WebAPI.Data.Entity
{
    public class CityEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public sbyte RowState { get; set; }
    }
}
