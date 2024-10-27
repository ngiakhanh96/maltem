using FluentValidation;
using MaltemBe.Dtos;

namespace MaltemBe.Validators
{
    public class CafeDtoValidator : AbstractValidator<CafeDto>
    {
        public CafeDtoValidator()
        {
            RuleFor(x => x.Name).NotNull().Length(6, 10);
            RuleFor(x => x.Description).MaximumLength(256);
            RuleFor(x => x.Logo.Length).LessThanOrEqualTo(2000000);
            RuleFor(x => x.Location).NotNull();
        }
    }
}
