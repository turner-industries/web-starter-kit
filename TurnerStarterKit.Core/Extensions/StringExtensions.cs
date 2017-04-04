using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace TurnerStarterKit.Core.Extensions
{
    public static class StringExtensions
    {
        public static string SplitWords(this string s)
        {
            return Regex.Replace(s, "([a-z])([A-Z])", "$1 $2");
        }

        public static string FormatPhoneNumber(this string s)
        {
            if (s == null)
                return null;

            var number = new string(s.Where(char.IsDigit).ToArray());
            return Regex.Replace(number, @"(\d{3})(\d{3})(\d{4})", "($1) $2-$3");
        }
    }
}
