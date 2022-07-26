using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Infrastructure.Extensions
{
    public static class DefaultEfConfiguration
    {
        public static void SetDefaultLengths(this ModelBuilder modelBuilder, int stringsMaxLength = 100, string decimalPrecision = "10,4", int datePrecision = 0)
        {
            foreach (var property in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetProperties().Where(p => p.ClrType == typeof(string))))
            {
                int? maxLength = property.GetMaxLength();

                if (maxLength is null || maxLength == 0)
                    maxLength = stringsMaxLength;

                property.SetColumnType($"varchar({maxLength})");
            }

            foreach (var property in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetProperties().Where(p => p.ClrType == typeof(decimal) || p.ClrType == typeof(Decimal))))
            {
                property.SetColumnType($"decimal({decimalPrecision})");
            }

            foreach (var property in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetProperties().Where(p => p.ClrType == typeof(DateTime))))
            {
                property.SetPrecision(datePrecision);
            }
        }
    }
}
