using FluentValidation;
using MaltemBe.Dtos;
using System.Text.RegularExpressions;

namespace MaltemBe.Validators
{
    public class EmployeeDtoValidator : AbstractValidator<EmployeeDto>
    {
        private const string SgPhoneNumberRegexPattern = @"\b(8|9)\d{7}\b";

        public EmployeeDtoValidator()
        {
            RuleFor(x => x.Name).NotNull().Length(6, 10);
            RuleFor(x => x.Email_address).NotNull().EmailAddress();
            RuleFor(x => x.Phone_number).Must(p =>
                Regex.Matches(p.ToString(), SgPhoneNumberRegexPattern).Count == 1);
        }
    }
}
