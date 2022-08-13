#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["src/Services/PigeonBox/PigeonBox.API/PigeonBox.API.csproj", "src/Services/PigeonBox/PigeonBox.API/"]
COPY ["src/Services/PigeonBox/PigeonBox.Application/PigeonBox.Application.csproj", "src/Services/PigeonBox/PigeonBox.Application/"]
COPY ["src/Services/PigeonBox/PigeonBox.Domain/PigeonBox.Domain.csproj", "src/Services/PigeonBox/PigeonBox.Domain/"]
COPY ["src/Core/PigeonBox.Core/PigeonBox.Core.csproj", "src/Core/PigeonBox.Core/"]
COPY ["src/Services/PigeonBox/PigeonBox.Infrastructure/PigeonBox.Infrastructure.csproj", "src/Services/PigeonBox/PigeonBox.Infrastructure/"]
RUN dotnet restore "src/Services/PigeonBox/PigeonBox.API/PigeonBox.API.csproj"
COPY . .
WORKDIR "/src/src/Services/PigeonBox/PigeonBox.API"
RUN dotnet build "PigeonBox.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PigeonBox.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PigeonBox.API.dll"]