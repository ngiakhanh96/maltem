﻿using MaltemBe.Models;
using MaltemBe.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MaltemBe.Repositories
{
    public class CafeRepository : ICafeRepository
    {
        private readonly CafeDbContext _dbContext;

        public CafeRepository(CafeDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Cafe>> GetCafesByLocationAsync(string location)
        {
            return await _dbContext.Cafes.Where(c => c.Location == location).Include(c => c.Employees).ToListAsync();
        }

        public async Task<Cafe?> GetCafeByNameAsync(string name)
        {
            return await _dbContext.Cafes.Where(c => c.Name == name).Include(c => c.Employees).FirstOrDefaultAsync();
        }

        public async Task<Cafe> AddCafeAsync(Cafe cafe)
        {
            await _dbContext.Cafes.AddAsync(cafe);
            return cafe;
        }

        public void DeleteCafe(Cafe cafe)
        {
            _dbContext.Cafes.Remove(cafe);
        }

        public void UpdateCafe(Cafe cafe)
        {
            _dbContext.Cafes.Update(cafe);
        }

        public async Task SaveChangesAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}